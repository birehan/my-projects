import 'package:equatable/equatable.dart';

/// Represents a user's chat request.
/// This class encapsulates a user's chat request, containing information such as the [message]
/// they want to communicate, the [address] associated with the request, and a boolean flag
/// [isNew] indicating whether the request is new or not.
class ChatRequest extends Equatable {
  /// The user's chat message.
  final String message;

  /// The address related to the chat request.
  final String address;

  /// A flag indicating whether the chat request is new.
  final bool isNew;

  /// Creates a [ChatRequest] instance with the specified details.
  const ChatRequest({
    required this.message,
    required this.address,
    required this.isNew,
  });

  @override
  List<Object?> get props => [isNew, address];
}
