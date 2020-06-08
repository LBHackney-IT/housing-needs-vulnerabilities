class CheckCustomerToken {
  constructor({ dbGateway }) {
    this.dbGateway = dbGateway;
  }

  async execute({ id, token }) {
    if (!id) return false;
    if (!token) return false;
    const plan = await this.dbGateway.get({ id });
    if (!plan) return false;
    return plan.customerTokens.filter(t => t.token === token).length > 0;
  }
}

module.exports = CheckCustomerToken;
