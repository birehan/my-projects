import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_institute_entity.dart';

/// Represents a chatbot's response to a user's request.
/// This class encapsulates a response from the chatbot, including the [reply] text,
/// a list of associated [institutes] that might be relevant, and a [speciality]
/// indicating a specific area of expertise.
class ChatResponse extends Equatable {
  /// The chatbot's reply text.
  final String reply;

  /// A list of institutes related to the chatbot's response.
  final List<ChatInstituteEntity> institutes;

  /// A specific area of expertise indicated in the chatbot's response.
  final String speciality;

  /// Creates a [ChatResponse] instance with the given details.
  const ChatResponse({
    required this.reply,
    required this.institutes,
    required this.speciality,
  });

  @override
  List<Object?> get props => [];
}
