using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.LevelEndpoints
{
    public class SetMainProgressEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly LevelInteractor levelInteractor;

        public SetMainProgressEndpoint(LevelInteractor levelInteractor)
        {
            this.levelInteractor = levelInteractor;
        }

        public override void Configure()
        {
            Post("set-main-progress");
            AllowAnonymous();
            Group<LevelEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int id = Query<int>("id");
            int progress = Query<int>("progress");

            var response = await levelInteractor.SetMainProgressAsync(id, progress);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
