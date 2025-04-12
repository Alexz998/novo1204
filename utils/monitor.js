class Monitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: [],
      memoryUsage: []
    };
  }

  trackRequest() {
    this.metrics.requests++;
  }

  trackError() {
    this.metrics.errors++;
  }

  trackResponseTime(time) {
    this.metrics.responseTime.push(time);
    // Manter apenas os últimos 100 tempos
    if (this.metrics.responseTime.length > 100) {
      this.metrics.responseTime.shift();
    }
  }

  trackMemoryUsage() {
    const usage = process.memoryUsage();
    this.metrics.memoryUsage.push({
      timestamp: new Date(),
      heapUsed: usage.heapUsed,
      heapTotal: usage.heapTotal
    });
    // Manter apenas os últimos 100 registros
    if (this.metrics.memoryUsage.length > 100) {
      this.metrics.memoryUsage.shift();
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      avgResponseTime: this.metrics.responseTime.length > 0
        ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length
        : 0,
      errorRate: this.metrics.requests > 0
        ? (this.metrics.errors / this.metrics.requests) * 100
        : 0
    };
  }

  reset() {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: [],
      memoryUsage: []
    };
  }
}

module.exports = new Monitor(); 