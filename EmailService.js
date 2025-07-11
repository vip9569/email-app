class MockProvider {
  constructor(name, failRate = 0.3) {
    this.name = name;
    this.failRate = failRate;
  }

  async sendEmail(email) {
    if (Math.random() < this.failRate) {
      throw new Error(`${this.name} failed`);
    }
    return `${this.name} sent email to ${email.to}`;
  }
}

class EmailService {
  constructor() {
    this.providers = [new MockProvider("ProviderA"), new MockProvider("ProviderB")];
    this.idempotencyCache = new Set();
    this.status = {};
    this.rateLimit = 5;
    this.sentThisMinute = 0;

    setInterval(() => {
      this.sentThisMinute = 0;
    }, 60000);
  }

  async send(email, id) {
    if (this.idempotencyCache.has(id)) {
      this.status[id] = 'Duplicate - Skipped';
      return { status: 'Duplicate - Skipped' };
    }

    if (this.sentThisMinute >= this.rateLimit) {
      this.status[id] = 'Rate limited';
      return { status: 'Rate limited' };
    }

    let attempt = 0;
    const maxRetries = 3;
    let lastError;

    for (let providerIndex = 0; providerIndex < this.providers.length; providerIndex++) {
      const provider = this.providers[providerIndex];

      while (attempt < maxRetries) {
        try {
          const result = await provider.sendEmail(email);
          this.idempotencyCache.add(id);
          this.status[id] = `Success with ${provider.name}`;
          this.sentThisMinute++;
          return { status: this.status[id], result };
        } catch (error) {
          lastError = error;
          await this.backoff(attempt);
          attempt++;
        }
      }

      attempt = 0; // reset for next provider
    }

    this.status[id] = `Failed: ${lastError.message}`;
    return { status: this.status[id] };
  }

  async backoff(attempt) {
    const delay = Math.pow(2, attempt) * 100;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  getStatus(id) {
    return this.status[id] || 'Unknown';
  }
}

module.exports = EmailService;
