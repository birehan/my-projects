import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import '../../../../core/utils/colors.dart';

/// The `ChatQuestionCard` widget represents a card that displays a chat question in the chat interface.
/// It is used to present questions from the chatbot or user in a stylized and consistent manner.

class ChatQuestionCard extends StatelessWidget {
  /// The chat question to be displayed in the card.
  final String chatQuestion;

  /// Constructs a `ChatQuestionCard` with the provided [chatQuestion].
  const ChatQuestionCard({super.key, required this.chatQuestion});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: Adaptive.w(3.75),
        vertical: Adaptive.w(2.16),
      ),
      decoration: BoxDecoration(
        color: backgroundColor, // Set the background color of the card.
        borderRadius: BorderRadius.circular(
          20, // Set the border radius to achieve rounded corners.
        ),
      ),
      child: Text(
        chatQuestion, // Display the chat question inside the card.
        textAlign: TextAlign.center, // Center-align the text within the card.
        style: TextStyle(
          fontSize: Adaptive.sp(15), // Set the font size using responsive sizing.
          fontWeight: FontWeight.w500, // Set the font weight to semi-bold.
          color: const Color.fromRGBO(0, 0, 0, 0.80), // Set the text color with a specific opacity.
        ),
      ),
    );
  }
}
