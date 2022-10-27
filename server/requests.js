//queris for database
const transactionsAgsAll = 'SELECT * FROM transactions_ags';
const transactionsTokensAll = 'SELECT * FROM transactions_tokens';
const accountsOldAll = 'SELECT * FROM az9_claimstatus';

module.exports.transactionsAgsAll = transactionsAgsAll;
module.exports.transactionsTokensAll = transactionsTokensAll;
module.exports.accountsOldAll = accountsOldAll;