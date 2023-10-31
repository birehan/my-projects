import 'package:get_it/get_it.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/datasources/chat_remote_data_soure.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/repositories/chat_repository.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/usecases/get_chat_response.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/bloc/chat_bot_bloc.dart';


import '../features/chatbot/data/repositories/chat_repository_impl.dart';

Future<void> chatBotInit(GetIt sl) async {
  // Bloc
  sl.registerFactory(
    () => ChatBotBloc(
      getChatResponse: sl(),
    ),
  );

  // usecases
  sl.registerLazySingleton(
    () => GetChatResponse(
      repository: sl(),
    ),
  );

  // Repositories
  sl.registerLazySingleton<ChatRepository>(
    () => ChatRepositoryImpl(
      remoteDataSource: sl(),
    ),
  );

  // Data Sources
  sl.registerLazySingleton<ChatRemoteDataSource>(
    () => ChatRemoteDataSourceImpl(
      client: sl(),
    ),
  );
}
