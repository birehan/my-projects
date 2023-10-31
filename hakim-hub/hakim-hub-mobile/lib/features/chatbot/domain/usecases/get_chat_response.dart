import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/core/usecases/usecase.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/repositories/chat_repository.dart';

/// Fetches chatbot responses based on user requests.
/// The responses are obtained in response to the given [ChatRequest].
class GetChatResponse extends UseCase<ChatResponse, ChatRequest> {
  final ChatRepository repository;

  /// Constructs a [GetChatResponse] instance with the required [repository].
  /// The [repository] is an instance of the `ChatRepository` used to fetch chatbot responses.
  GetChatResponse({required this.repository});

  /// Fetches a chatbot response for the provided [chatRequest].

/// This function can produce a successful [ChatResponse] containing the requested
/// information or, in case of an error, a [Failure].

  
  Future<Either<Failure, ChatResponse>> call(ChatRequest chatRequest) async {
    return await repository.getChatResponse(chatRequest);
  }
}
