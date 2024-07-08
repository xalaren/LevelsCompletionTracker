using LevelsCompletionTracker.Adapter.ContextsEF;
using LevelsCompletionTracker.Adapter.Helpers;
using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Core.Repositories;

namespace LevelsCompletionTracker.Adapter.RepositoriesEF
{
    public class CircleRunRepository : ICircleRunRepository
    {
        private readonly AppDbContext context;

        public CircleRunRepository(AppDbContext context)
        {
            this.context = context;
        }

        public async Task<CircleRun?> FindByDateTimeInLevel(int levelId, DateTime date)
        {
            var level = await context.Levels.FindAsync(levelId);
            
            if(level == null)
            {
                throw new ArgumentNullException(nameof(level), "Уровень не был найден"); 
            }


            var circleRun = level.CircleRuns.FirstOrDefault(circleRun =>
               circleRun.CreatedAt.IsComparedByDate(date));

            if (level == null)
            {
                throw new ArgumentNullException("", "Level was null or empty");
            }

            return circleRun;
        }

        public void Update(CircleRun circleRun)
        {
            context.CircleRuns.Update(circleRun);
        }
    }
}
