using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class RemoveLevelEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly LevelInteractor levelInteractor;

        public RemoveLevelEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Delete("remove");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            var id = Query<int>("id");

            var response = await levelInteractor.RemoveLevelAsync(id);

            if(response.Error)
            {
                await SendAsync(response, 400, token);
            }
            else
            {
                await SendAsync(response, 200, token);
            }
        }
    }
}
