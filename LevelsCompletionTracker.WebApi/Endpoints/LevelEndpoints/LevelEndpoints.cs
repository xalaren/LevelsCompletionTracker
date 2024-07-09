using FastEndpoints;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class LevelEndpoints : Group
    {
        public LevelEndpoints()
        {
            Configure("LevelController", ep =>
            {
                ep.DontAutoTag();
                ep.Description(builder => builder.WithTags("LevelController"));
            });
        }
    }
}
