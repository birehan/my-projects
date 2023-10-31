part of 'chat_bot_bloc.dart';

abstract class ChatBotEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class GetChatResponseEvent extends ChatBotEvent {
  final ChatRequest request;
  GetChatResponseEvent({required this.request});

  @override
  List<Object?> get props => [request];
}

class SetIntialStateEvent extends ChatBotEvent {
  SetIntialStateEvent();
  @override
  List<Object?> get props => [];
}
