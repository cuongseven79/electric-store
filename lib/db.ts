import { Prisma, PrismaClient } from '@prisma/client';
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
const db = new PrismaClient({
  log: [],

  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 5000, // default: 5000
  },
});
// db.$on('query', async (e) => {
//   console.log(`${e.query} ${e.params}`);
// });
export { db };
