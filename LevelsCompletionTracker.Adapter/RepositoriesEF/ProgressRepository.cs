using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;

namespace LevelsCompletionTracker.Adapter.RepositoriesEF
{
    public class ProgressRepository : IProgressRepository
    {
        private readonly AppDbContext context;

        public ProgressRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task CreateAsync(Progress progress)
        {
           await context.AddAsync(progress);
        }

        public async Task<Progress?> GetAsync(int progressId)
        {
            return await context.Progresses.FindAsync(progressId);
        }

        public void Remove(Progress progress)
        {
            context.Progresses.Remove(progress);
        }
    }
}
