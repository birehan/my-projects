import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_request_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';
/// Abstract blueprint for a chat repository.
/// This class defines the interface for fetching chatbot responses
/// based on user requests.
abstract class ChatRepository {
  /// Fetches a chatbot response for the given [chatRequest].
  /// Returns a `Failure` on error or a `ChatResponse` on success.
  Future<Either<Failure, ChatResponse>> getChatResponse(ChatRequest chatRequest);
}
