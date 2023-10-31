import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_box.dart';
import 'package:hakim_hub_mobile/router/routes.dart';

/// The `ChatResponseScreen` widget displays a list of chat messages using the `ChatBox` widget.
/// It is used to show the conversation history between the user and the chatbot.

class ChatResponseScreen extends StatelessWidget {
  /// The list of chat messages to display.
  List chatMessages;

  /// Constructs a `ChatResponseScreen` with the provided [chatMessages].
  ChatResponseScreen({super.key, required this.chatMessages});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: chatMessages.length,
          itemBuilder: (BuildContext context, int index) {
            return Column(
              children: [
                ChatBox(
                  chatMessage: chatMessages[index], // Display the chat message at the current index.
                  index: index, // Pass the current index to the ChatBox for identification purposes.
                  navigateHospital: (instituteId) {
                    // Define a function to navigate to the HospitalDetailPage with the provided instituteId.
                    context.pushNamed(AppRoutes.HospitalDetailPage,
                        queryParameters: {"id": instituteId, "prevIndex": "1"});
                  },
                  navigateDoctor: (doctorId) {
                    // Define a function to navigate to the DoctorDetailPage with the provided doctorId.
                    context.pushNamed(AppRoutes.DoctorDetailPage,
                        queryParameters: {"id": doctorId, "prevIndex": "1"});
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
    );
  }
}
