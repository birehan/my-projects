import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/user_message_card.dart';

import 'package:responsive_sizer/responsive_sizer.dart';

import 'ai_response_card.dart';

class ChatBox extends StatelessWidget {
  Function navigateDoctor;
  Function navigateHospital;
  ChatBox(
      {super.key,
      required this.chatMessage,
      required this.index,
      required this.navigateDoctor,
      required this.navigateHospital});

  final chatMessage;
  final int index;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: chatMessage[0] == 0 ? pixleToPercent(30, "width").w : 0,
        right: chatMessage[0] == 1 ? pixleToPercent(30, "width").w : 0,
      ),
      child: chatMessage[0] == 0
          ? UserChatCard(chatMessage: chatMessage[1])
          : AiMessageCard(
              chatMessage: chatMessage[1],
              navigateDoctor: navigateDoctor,
              navigateHospital: navigateHospital),
    );
  }
}
