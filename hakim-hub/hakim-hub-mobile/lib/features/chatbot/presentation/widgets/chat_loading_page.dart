import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_box.dart';
import 'package:hakim_hub_mobile/router/routes.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

import '../../../../core/utils/colors.dart';

/// The `ChatLoadingScreen` widget displays a loading animation while waiting for the chatbot response.
/// It is used to show the loading animation during the time the chatbot is processing the user's input.

class ChatLoadingScreen extends StatelessWidget {
  /// The list of chat messages to display.
  List chatMessages;

  /// Constructs a `ChatLoadingScreen` with the provided [chatMessages].
  ChatLoadingScreen({super.key, required this.chatMessages});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: ListView.builder(
                itemCount: chatMessages.length + 1,
                itemBuilder: (BuildContext context, int index) {
                  if (index == chatMessages.length) {
                    // Display the loading animation widget when reaching the last index.
                    return Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          LoadingAnimationWidget.waveDots(
                            color: primaryColor, // Set the color of the loading animation.
                            size: 30, // Set the size of the loading animation.
                          ),
                        ],
                      ),
                    );
                  }
                  return Column(
                    children: [
                      ChatBox(
                        chatMessage: chatMessages[index], // Display the chat message at the current index.
                        index: index, // Pass the current index to the ChatBox for identification purposes.
                        navigateHospital: (instituteId) {
                          // Define a function to navigate to the HospitalDetailPage with the provided instituteId.
                          context.pushNamed(AppRoutes.HospitalDetailPage,
                              queryParameters: {
                                "id": instituteId,
                                "prevIndex": "1"
                              });
                        },
                        navigateDoctor: (doctorId) {
                          // Define a function to navigate to the DoctorDetailPage with the provided doctorId.
                          context.pushNamed(AppRoutes.DoctorDetailPage,
                              queryParameters: {
                                "id": doctorId,
                                "prevIndex": "1"
                              });
                        },
                      ),
                      const SizedBox(
                        height: 16,
                      ), // Add vertical spacing between chat messages.
                    ],
                  );
                },
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 20),
          ), // Add additional padding at the top of the loading screen.
        ],
      ),
    );
  }
}
