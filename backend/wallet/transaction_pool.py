class TransactionPool:
    def __init__(self) -> None:
        self.transaction_map = {}

    def set_transaction(self, transaction):
        """
        Set a transaction in the transaction pool.
        """
        self.transaction_map[transaction.id] = transaction

    def existing_transaction(self, address):
        """
        Find a transaction by the address in the pool
        """
        for transaction in self.transaction_map.values():
            if transaction.input['address'] == address:
                return transaction
