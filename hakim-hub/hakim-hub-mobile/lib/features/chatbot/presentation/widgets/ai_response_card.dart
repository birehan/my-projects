import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/features/chatbot/data/models/chat_response_model.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/institution_card.dart';

/// The `AiMessageCard` widget displays the chatbot's response as a message card.
/// It includes the chatbot's reply text and a list of institutes (if available) along with corresponding navigation functions.

class AiMessageCard extends StatelessWidget {
  /// The `ChatResponseModel` representing the chatbot's response message.
  final ChatResponseModel chatMessage;

  /// Callback function to navigate to a specific hospital using the hospital's [instituteId].
  final Function navigateHospital;

  /// Callback function to navigate to a specific doctor using the doctor's [doctorId].
  final Function navigateDoctor;

  /// Constructs an `AiMessageCard` with the provided [chatMessage], [navigateDoctor], and [navigateHospital].
  AiMessageCard({
    required this.chatMessage,
    required this.navigateDoctor,
    required this.navigateHospital,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topLeft,
      child: Container(
        constraints: const BoxConstraints(maxWidth: 300),
        padding: const EdgeInsets.all(10),
        margin: const EdgeInsets.fromLTRB(10, 5, 0, 0),
        decoration: const BoxDecoration(
          color: chatBoxColor,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(15),
            topRight: Radius.circular(15),
            bottomRight: Radius.circular(15),
          ),
        ),
        child: Column(
          children: [
            // Display the chatbot's reply text.
            Text(
              chatMessage.reply,
              style: const TextStyle(color: primaryTextColor),
            ),
            const SizedBox(height: 10),
            // Check if there are institutes in the chatbot's response.
            chatMessage.institutes.isNotEmpty
                ? SizedBox(
                    height: 280,
                    child: ListView.builder(
                      itemCount: chatMessage.institutes.length,
                      itemBuilder: (BuildContext context, int i) {
                        return Column(
                          children: [
                            // Display the `InstitutionCard` for each institute.
                            institutionCard(
                              chatMessage.institutes[i],
                              // Callback function to navigate to a specific hospital when an institute is tapped.
                              (instituteId) {
                                navigateHospital(instituteId);
                              },
                              // Callback function to navigate to a specific doctor when an institute is tapped.
                              (doctorId) {
                                navigateDoctor(doctorId);
                              },
                            ),
                            const SizedBox(height: 20),
                          ],
                        );
                      },
                    ),
                  )
                // If no institutes in the response, show an empty container.
                : Container(),
          ],
        ),
      ),
    );
  }
}
