using FastEndpoints;
using LevelsCompletionTracker.Core.Interactors;
using LevelsCompletionTracker.Shared.Output;

namespace LevelsCompletionTracker.WebApi.Endpoints.ProgressEndpoints
{
    public class RemoveAllProgressEndpoint : EndpointWithoutRequest<Response>
    {
        private readonly ProgressInteractor progressInteractor;

        public RemoveAllProgressEndpoint(ProgressInteractor progressInteractor)
        {
            this.progressInteractor = progressInteractor;
        }

        public override void Configure()
        {
            Delete("remove-all");
            AllowAnonymous();
            Group<ProgressEndpoints>();
        }

        public override async Task HandleAsync(CancellationToken token)
        {
            int levelId = Query<int>("levelId");

            var response = await progressInteractor.ClearAllProgressesAsync(levelId);

            int code = response.Error ? 400 : 200;

            await SendAsync(response, code, token);
        }
    }
}
