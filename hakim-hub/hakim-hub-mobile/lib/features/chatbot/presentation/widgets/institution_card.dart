import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/calculate_list_view_height.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/hover_builder.dart';
import 'package:hakim_hub_mobile/features/chatbot/domain/entities/chat_institute_entity.dart';
import 'package:hakim_hub_mobile/features/chatbot/presentation/widgets/doctor_card.dart';

Widget institutionCard(ChatInstituteEntity chatInstituteEntity,
    Function navigateHosptial, Function navigateDoctor) {
  return Card(
    elevation: 3,
    color: const Color.fromRGBO(237, 237, 237, 1),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
    child: Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          GestureDetector(
            onTap: () {
              navigateHosptial(chatInstituteEntity.instituteId);
            },
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: shimmerColor,
                  backgroundImage: NetworkImage(
                    chatInstituteEntity.logoUrl,
                  ),
                  onBackgroundImageError: (exception, stackTrace) {
                    const CircleAvatar(
                      backgroundImage:
                          AssetImage('assets/images/doctor_image.png'),
                    );
                  },
                ),
                const SizedBox(
                  width: 12,
                ),
                Expanded(
                  child: HoverBuilder(
                    builder: (isHovered) {
                      return Text(
                        chatInstituteEntity.instituteName,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: isHovered ? Colors.blue : Colors.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      );
                    },
                  ),
                )
              ],
            ),
          ),
          const SizedBox(
            height: 8,
          ),
          chatInstituteEntity.doctors.isNotEmpty
              ? SizedBox(
                  height: calculateListViewHeight(
                      chatInstituteEntity.doctors.length),
                  width: 270,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 5.0),
                    child: ListView.builder(
                      itemCount: chatInstituteEntity.doctors.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Column(
                          children: [
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 2.0),
                              child: GestureDetector(
                                child: doctor(
                                  chatInstituteEntity.doctors[index],
                                ),
                                onTap: () {
                                  navigateDoctor(
                                      chatInstituteEntity.doctors[index].id);
                                },
                              ),
                            ),
                            const Padding(
                              padding: EdgeInsets.fromLTRB(70, 0, 40, 0),
                              child: Divider(
                                color: greyColor,
                                thickness: 0.3,
                              ),
                            )
                          ],
                        );
                      },
                    ),
                  ),
                )
              : Container()
        ],
      ),
    ),
  );
}
