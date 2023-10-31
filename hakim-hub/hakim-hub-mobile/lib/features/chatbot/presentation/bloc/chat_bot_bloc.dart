import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/usecases/get_chat_response.dart';
import '../../../../core/error/failures.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_response_entity.dart';

import '../../domain/entities/chat_request_entity.dart';
part 'chat_bot_state.dart';
part 'chat_bot_event.dart';

class ChatBotBloc extends Bloc<ChatBotEvent, ChatBotState> {
  final GetChatResponse getChatResponse;
  ChatBotBloc({required this.getChatResponse}) : super(ChatBotInitialState()) {
    on<GetChatResponseEvent>((event, emit) async {
      emit(ChatBotLoadingState());
      print("before return from bloc");
      await getChatResponse(event.request).then(
        (value) {
          value.fold(
              (l) => emit(
                    ChatBotFailureState(error: l),
                  ), (r) {
            print("return from bloc");
            print(r);
            print("after return from bloc");
            return emit(ChatBotSuccessState(chatResponse: r));
          });
        },
      );
    });
    on<SetIntialStateEvent>(
      (event, emit) async {
        emit(ChatBotInitialState());
      },
    );
  }
}
