using System.ComponentModel;
using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.Helpers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LevelsCompletionTracker.Adapter.RepositoriesEF
{
    public class ProgressContainerRepository : IProgressContainerRepository
    {
        private readonly AppDbContext context;

        public ProgressContainerRepository(AppDbContext context)
        {
            this.context = context;
        }
        public async Task<ProgressContainer> FindByDateTimeInLevel(Level level, DateTime date)
        {
            var progressContainer = level.ProgressContainers.FirstOrDefault(container =>
                container.CreatedAt.IsComparedByDate(date));

            if (level == null)
            {
                throw new ArgumentNullException("", "Level was null or empty");
            }

            if (progressContainer != null)
            {
                await context.Entry(progressContainer)
                    .Collection(container => container.Progresses)
                    .LoadAsync();
            }

            return progressContainer;
        }

        public async Task<ProgressContainer?> GetAsync(int progressContainerId)
        {
            return await context.ProgressContainers.FindAsync(progressContainerId);
        }

        public void Remove(ProgressContainer progressContainer)
        {
            context.ProgressContainers.Remove(progressContainer);
        }
    }
}