using LevelsCompletionTracker.Core.Model;
using LevelsCompletionTracker.Shared.DataTransferObjects;

namespace LevelsCompletionTracker.Core.Mappers
{
    public static class CircleRunMapper
    {
        public static CircleRun ToEntity(this CircleRunDto circleRunDto)
        {
            return new CircleRun()
            {
                Id = circleRunDto.Id,
                LevelId = circleRunDto.LevelId,
                Attempts = circleRunDto.Attempts,
                Count = circleRunDto.Count,
                CreatedAt = circleRunDto.CreatedAt
            };
        }

        public static CircleRunDto ToDto(this CircleRun circleRunEntity)
        {
            return new CircleRunDto()
            {
                Id = circleRunEntity.Id,
                LevelId = circleRunEntity.LevelId,
                Attempts = circleRunEntity.Attempts,
                Count = circleRunEntity.Count,
                CreatedAt = circleRunEntity.CreatedAt,
            };
        }
    }
}
