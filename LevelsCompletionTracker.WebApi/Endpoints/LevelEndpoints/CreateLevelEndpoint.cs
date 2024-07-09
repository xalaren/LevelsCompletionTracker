using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.DataTransferObjects;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class CreateLevelRequest
    {
        public LevelDto LevelDto { get; set; } = null!;
    }
    
    public class CreateLevelEndpoint : Endpoint<LevelDto, Response>
    {
        private readonly LevelInteractor levelInteractor;

        public CreateLevelEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Post("create");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(LevelDto levelDto, CancellationToken token)
        {
            var response = await levelInteractor.CreateLevelAsync(levelDto);

            if(!response.Error)
            {
                await SendAsync(response, 200, token);
            }
            else
            {
                await SendAsync(response, 400, token);
            }
        }
    }
}
