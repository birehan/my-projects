import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/chat_box.dart';
import 'package:hakim_hub_mobile/router/routes.dart';

/// The `ChatInitialPage` widget displays a list of chat messages using the `ChatBox` widget.
/// It is used to show the initial conversation history between the user and the chatbot.
/// If there is a network issue, it will display an error message at the end of the chat messages.

class ChatInitialPage extends StatelessWidget {
  /// The list of chat messages to display.
  List chatMessages;

  /// Constructs a `ChatInitialPage` with the provided [chatMessages].
  ChatInitialPage({super.key, required this.chatMessages});

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
                    // Display the error message when reaching the last index.
                    return Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(15),
                            decoration: BoxDecoration(
                              color: Colors.red[200], // Set the background color of the error message container.
                              borderRadius: const BorderRadius.all(
                                Radius.circular(15), // Set the border radius of the error message container.
                              ),
                            ),
                            child: const Text(
                              "Please check your network", // Display the error message.
                              style: TextStyle(
                                color: Colors.white, // Set the text color of the error message.
                                fontSize: 14,
                              ),
                            ),
                          )
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
        ],
      ),
    );
  }
}
