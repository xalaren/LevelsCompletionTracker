using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Shared.DataTransferObjects;

namespace LevelsCompletionTracker.Core.Mappers
{
    public static class LevelMapper
    {
        public static LevelDto ToDto(this Level level)
        {
            if(level == null)
            {
                throw new ArgumentNullException("Level was null", nameof(level));
            }

            var circleRunsTotalCount = level.CircleRuns.Sum(circleRun => circleRun.Count);
            var circleRunsTotalAttempts = level.CircleRuns.Sum(circleRun => circleRun.Attempts);

            return new LevelDto()
            {
                Id = level.Id,
                Name = level.Name,
                Author = level.Author,
                Difficulty = level.Difficulty,
                Status = level.Status,
                MainProgress = level.MainProgress,
                Priority = level.Priority,
                CircleRunsTotalCount = circleRunsTotalCount,
                CircleRunsTotalAttempts = circleRunsTotalAttempts,
                Attempts = level.Attempts + circleRunsTotalAttempts,
                ProgressContainers = level.ProgressContainers
                    .Select(container => container.ToDto())
                    .Where(container => container.Progresses.Count > 0)
                    .OrderByDescending(container => container.Id).ToList(),
                CircleRuns = level.CircleRuns
                    .Select(circleRun => circleRun.ToDto())
                    .Where(circleRun => circleRun.Count > 0)
                    .OrderByDescending(circleRun => circleRun.CreatedAt)
                    .ToList(),
            };
        }

        public static Level ToEntity(this LevelDto levelDto)
        {
            if(levelDto == null)
            {
                throw new ArgumentNullException("", "LevelDto was null");
            }

            return new Level()
            {
                Id = levelDto.Id,
                Name = levelDto.Name,
                Author = levelDto.Author,
                Attempts = levelDto.Attempts,
                Difficulty = levelDto.Difficulty,
                MainProgress = levelDto.MainProgress,
                Priority = levelDto.Priority,
                Status = levelDto.Status,
                ProgressContainers = levelDto.ProgressContainers.Select(containerDto => containerDto.ToEntity()).ToList(),
            };
        }
    }
}
