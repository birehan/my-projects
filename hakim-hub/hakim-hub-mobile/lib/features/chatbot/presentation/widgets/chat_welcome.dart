import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

/// The `ChatWelcome` widget displays a welcome message along with the HakimHub logo.
/// It is used to greet users when they enter the chat interface.

class ChatWelcome extends StatelessWidget {
  const ChatWelcome({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/images/HakimHubVectorImg.png',
              width: Adaptive.w(
                11,
              ), // Set the width of the HakimHub logo using responsive sizing.
            ),
            SizedBox(
              width: Adaptive.h(1.62),
            ), // Add a horizontal spacing between the two logo images.
            Image.asset(
              'assets/images/HakimHub.png',
              width: Adaptive.w(
                31.5,
              ), // Set the width of the HakimHub logo using responsive sizing.
            )
          ],
        ),
        SizedBox(
          height: Adaptive.h(1.07),
        ), // Add vertical spacing between the logos and the welcome message.
        Text(
          'Welcome to HakimHub', // Display the welcome message.
          style: TextStyle(
            fontWeight: FontWeight.bold, // Apply bold font weight to the welcome message.
            fontSize: Adaptive.sp(20), // Set the font size of the welcome message using responsive sizing.
          ),
        )
      ],
    );
  }
}
