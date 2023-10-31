import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/write_chat.dart';

import '../../../../core/shared_widgets/appBar.dart';

import 'package:responsive_sizer/responsive_sizer.dart';

import '../widgets/chat_welcome.dart';
import '../widgets/landing_page_question.dart';

class ChatLandingPage extends StatefulWidget {
  const ChatLandingPage({super.key});

  @override
  State<ChatLandingPage> createState() => _ChatLandingPageState();
}

class _ChatLandingPageState extends State<ChatLandingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: CHSAppBar.build(context, "", () {}, true),
      body: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              physics: BouncingScrollPhysics(),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  SizedBox(
                    height: Adaptive.h(4.4),
                  ),
                  const ChatWelcome(),
                  SizedBox(
                    height: Adaptive.h(4.4),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: Adaptive.w(6.5),
                    ),
                    child: Text(
                      'use the power of AI to find a hospital suggestion based on your symptoms and preference',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: Adaptive.sp(16)),
                    ),
                  ),
                  SizedBox(
                    height: Adaptive.h(4.4),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: Adaptive.w(5.2),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const ChatQuestionCard(chatQuestion: "I have a sharp, stabbing pain in my eye, like a strong prick or poke. It's making it tough for me to keep my eye open or see clearly"),
                        SizedBox(
                          height: Adaptive.h(4.4),
                        ),
                        const ChatQuestionCard(chatQuestion: "I have this intense, sharp headache on the right side of my head, it feels like a needle stabbing me repeatedly.",),
                        SizedBox(
                          height: Adaptive.h(4.4),
                        ),
                        const ChatQuestionCard(chatQuestion: "I have a really bad toothache that feels like a sharp, throbbing pain in my tooth. It's making it really hard for me to eat or talk.",),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 16.0),
              child: Align(
                alignment: Alignment.bottomCenter,
                child: WriteChat(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
