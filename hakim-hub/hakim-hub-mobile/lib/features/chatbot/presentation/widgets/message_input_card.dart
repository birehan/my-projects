import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/bloc/chat_bot_bloc.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/colors.dart';
import '../../domain/entities/chat_request_entity.dart';

/// The `MessageInputCard` widget represents the input card for sending messages in the chat interface.
/// It includes a text field where users can type their messages and a send button to submit the message.

class MessageInputCard extends StatelessWidget {
  /// The list of chat messages to store the chat history.
  List chatMessages;

  /// The controller for the text field to capture user input.
  final TextEditingController _textEditingController = TextEditingController();

  /// Constructs a `MessageInputCard` with the provided [chatMessages].
  MessageInputCard({super.key, required this.chatMessages});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: pixleToPercent(46, "width"),
          vertical: pixleToPercent(20, "width"),
        ),
        decoration: BoxDecoration(
          color: backgroundColor, // Set the background color of the input card.
          borderRadius: BorderRadius.circular(
            Adaptive.w(4.6), // Set the border radius using responsive sizing.
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                onSubmitted: (value) {
                  // When the user submits the text field:
                  String query = _textEditingController.text;
                  _textEditingController.clear(); // Clear the text field.
                  chatMessages.add([0, query]); // Add the user's message to the list of chat messages.
                  BlocProvider.of<ChatBotBloc>(context).add(
                    // Dispatch a GetChatResponseEvent to fetch the chatbot's response.
                    GetChatResponseEvent(
                      request: ChatRequest(
                        message: query,
                        isNew: false,
                        address: "ipadhgjlpopoplkdress",
                      ),
                    ),
                  );
                },
                textInputAction: TextInputAction.done,
                controller: _textEditingController,
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Write a message ...', // Placeholder text for the text field.
                ),
              ),
            ),
            IconButton(
              icon: const Icon(
                Icons.send,
                color: primaryColor, // Set the color of the send button icon.
              ),
              onPressed: () {
                // When the send button is pressed:
                String query = _textEditingController.text;
                _textEditingController.clear(); // Clear the text field.
                chatMessages.add([0, query]); // Add the user's message to the list of chat messages.
                BlocProvider.of<ChatBotBloc>(context).add(
                  // Dispatch a GetChatResponseEvent to fetch the chatbot's response.
                  GetChatResponseEvent(
                    request: ChatRequest(
                      message: query,
                      isNew: false,
                      address: "ipadhgjlpopoplkdress",
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
