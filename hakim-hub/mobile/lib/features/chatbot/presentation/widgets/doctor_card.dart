import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/hover_builder.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_doctor_entity.dart';

Widget doctor(ChatDoctorEntity chatDoctorEntity) {
  return Container(
    padding: const EdgeInsets.all(0),
    decoration: const BoxDecoration(
      color: Color.fromRGBO(237, 237, 237, 1),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        CircleAvatar(
          backgroundColor: shimmerColor,
          backgroundImage: NetworkImage(chatDoctorEntity.photoUrl),
          onBackgroundImageError: (exception, stackTrace) {
            const CircleAvatar(
              backgroundImage: AssetImage('assets/images/doctor_image.png'),
            );
          },
          radius: 15,
        ),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            HoverBuilder(
              builder: (isHovered) {
                return Container(
                  constraints: BoxConstraints(minWidth: 120),
                  width: 150,
                  child: Text(
                    chatDoctorEntity.fullName,
                    style: TextStyle(
                      color: isHovered ? Colors.blue : Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                );
              },
            ),
            Text(
              chatDoctorEntity.speciality,
              style: const TextStyle(
                fontWeight: FontWeight.w300,
                color: primaryTextColor,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ],
    ),
  );
}
