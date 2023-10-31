/// The `chatbot` feature of the application enables users to interact with a chatbot.
/// This feature includes a ChatPage where users can view and send messages to the chatbot.
/// The chatbot responses are displayed on the screen along with a message input card for user input.

// Import necessary packages and libraries.
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_initial_page.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_loading_page.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_response_page.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/message_input_card.dart';
import '../../../../core/utils/colors.dart';
import '../../../../router/routes.dart';
import '../../domain/entities/chat_request_entity.dart';
import '../bloc/chat_bot_bloc.dart';

/// The ChatPage is a StatefulWidget responsible for displaying the chatbot conversation and user input.
class ChatPage extends StatefulWidget {
  /// A list of [chatMessages] to store the chat history.
  List chatMessages;

  /// Constructs a ChatPage with the provided [chatMessages].
  ChatPage({required this.chatMessages, super.key});

  @override
  _ChatPageState createState() => _ChatPageState();
}

/// The state for the ChatPage widget.
class _ChatPageState extends State<ChatPage> {
  final TextEditingController _textEditingController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // When the page is initialized, fetch the initial chat response from the ChatBotBloc.
    BlocProvider.of<ChatBotBloc>(context).add(GetChatResponseEvent(
        request: ChatRequest(
            message: widget.chatMessages[0][1],
            address: "ipadhgjlpopoplkdress",
            isNew: true)));
  }

  /// Clears all chat messages in the current chat session.
  void clearChat() {
    setState(() {
      widget.chatMessages.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Customize the app bar with appropriate colors and icons.
        foregroundColor: Colors.white,
        shadowColor: Colors.transparent,
        leading: GestureDetector(
          onTap: () => {
            // When the back button is tapped:
            clearChat(), // Clear all chat messages.
            BlocProvider.of<ChatBotBloc>(context).add(SetIntialStateEvent()), // Reset the ChatBotBloc state.
            context.goNamed(AppRoutes.Home, queryParameters: {
              "index": "1",
            }), // Navigate back to the home page with index 1.
          },
          child: const Icon(Icons.arrow_back, color: Colors.black),
        ),
        actions: [
          // Add an action button on the app bar to clear chat and return to home page.
          IconButton(
            icon: const Icon(
              Icons.add,
              color: primaryColor,
            ),
            onPressed: () {
              // When the action button is pressed:
              clearChat(); // Clear all chat messages.
              BlocProvider.of<ChatBotBloc>(context).add(SetIntialStateEvent()); // Reset the ChatBotBloc state.
              context.goNamed(AppRoutes.Home, queryParameters: {
                "index": "1",
              }); // Navigate back to the home page with index 1.
            },
          ),
        ],
        backgroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // Use BlocBuilder to dynamically display different chat screens based on the ChatBotBloc state.
          BlocBuilder<ChatBotBloc, ChatBotState>(
            builder: (context, state) {
              if (state is ChatBotInitialState) {
                // Show the initial chat screen with welcome message and instructions.
                return ChatResponseScreen(chatMessages: widget.chatMessages);
              } else if (state is ChatBotLoadingState) {
                // Show the loading screen while waiting for the chatbot response.
                return ChatLoadingScreen(chatMessages: widget.chatMessages);
              } else if (state is ChatBotSuccessState) {
                // When a successful response is received from the chatbot:
                widget.chatMessages.add([1, state.chatResponse]); // Add the chat response to the list of chat messages.
                return ChatResponseScreen(chatMessages: widget.chatMessages); // Display the updated chat screen.
              } else {
                // If no specific state matches, show the initial chat screen.
                return ChatInitialPage(chatMessages: widget.chatMessages);
              }
            },
          ),
          // Display the message input card for user input.
          MessageInputCard(chatMessages: widget.chatMessages)
        ],
      ),
    );
  }
}
