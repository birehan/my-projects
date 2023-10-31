part of 'chat_bot_bloc.dart';

abstract class ChatBotState extends Equatable {
  const ChatBotState();

  @override
  List<Object?> get props => [];
}

class ChatBotInitialState extends ChatBotState {}

class ChatBotLoadingState extends ChatBotState {}

class ChatBotSuccessState extends ChatBotState {
  final ChatResponse chatResponse;
  const ChatBotSuccessState({required this.chatResponse});

  @override
  List<Object?> get props => [chatResponse];
}

class ChatBotFailureState extends ChatBotState {
  final Failure error;
  const ChatBotFailureState({required this.error});

  @override
  List<Object?> get props => [error];
}
