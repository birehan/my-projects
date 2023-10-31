import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/pixle_to_percent.dart';
import '../../../../core/utils/ui_converter.dart';
import '../../domain/entities/doctor_detail.dart';

class DoctorAvatarSection extends StatelessWidget {
  final DoctorDetail doctorDetail;
  final context_;

  const DoctorAvatarSection({Key? key, required this.doctorDetail, required this.context_})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: pixleToPercent(210, "height").h,
      width: double.infinity,
      child: Stack(
        alignment: Alignment.topCenter,
        children: [
          Container(
              width: double.infinity, height: pixleToPercent(214, "height").h),
          CircleAvatar(
            radius: pixleToPercent(200, "height").h / 2,
            backgroundImage: NetworkImage(doctorDetail.photoUrl),
            onBackgroundImageError: (exception, stackTrace) {
              AssetImage(doctorDetail.photoUrl);
            },
          ),
          Positioned(
            top: pixleToPercent(0, "height").h,
            left: pixleToPercent(20, "width").w,
            child: GestureDetector(
              child: const CircleAvatar(
                backgroundColor: backgroundColor,
                child: backButtonPro,
              ),
              onTap: () {
                context_.pop();
              },
            ),
          ),
        ],
      ),
    );
  }
}
