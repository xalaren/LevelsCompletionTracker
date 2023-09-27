using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Core.Transaction;

namespace LevelsCompletionTracker.Adapter.Transaction
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;

        public UnitOfWork(AppDbContext context)
        {
            this.context = context;
        }

        public void Commit()
        {
            context.SaveChanges();
        }
    }
}
