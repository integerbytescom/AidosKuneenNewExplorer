const transactionsAgsAll = 'SELECT * FROM transactions_ags';
const transactionsTokensAll = 'SELECT * FROM transactions_tokens';

const transactionsAccount = "SELECT * FROM transactions_ags WHERE (txfrom='0x00a8a137490a3870a4cd9d73a75a563d1f017053' OR txto='0x00a8a137490a3870a4cd9d73a75a563d1f017053')";

module.exports.transactionsAgsAll = transactionsAgsAll;
module.exports.transactionsTokensAll = transactionsTokensAll;
module.exports.transactionsAccount = transactionsAccount;