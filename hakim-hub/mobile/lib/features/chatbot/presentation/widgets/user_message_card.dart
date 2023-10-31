import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';

/// The `UserChatCard` widget displays a user's chat message as a message card.
/// The card is aligned to the top-right corner and has a distinct background color.

class UserChatCard extends StatelessWidget {
  /// The user's chat message to be displayed in the card.
  final String chatMessage;

  /// Constructs a `UserChatCard` with the provided [chatMessage].
  UserChatCard({required this.chatMessage});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topRight,
      child: Container(
        constraints: const BoxConstraints(maxWidth: 300),
        padding: const EdgeInsets.all(10),
        margin: const EdgeInsets.fromLTRB(0, 5, 10, 0),
        decoration: const BoxDecoration(
          color: primaryColor, // Set the card's background color to the primaryColor defined in the colors.dart file.
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(15),
            topRight: Radius.circular(15),
            bottomLeft: Radius.circular(15),
          ),
        ),
        child: Text(
          chatMessage,
          style: const TextStyle(color: secondryTextColor), // Set the text color to the secondaryTextColor defined in the colors.dart file.
        ),
      ),
    );
  }
}
