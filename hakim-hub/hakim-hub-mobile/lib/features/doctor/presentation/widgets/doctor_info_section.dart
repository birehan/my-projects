import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/pixle_to_percent.dart';
import '../../../../core/utils/ui_converter.dart';
import '../../domain/entities/doctor_detail.dart';

class DoctorInfoSection extends StatelessWidget {
  final DoctorDetail doctorDetail;

  const DoctorInfoSection({Key? key, required this.doctorDetail})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        SizedBox(height: pixleToPercent(20, "height").h),
        Text(
          doctorDetail.fullName,
          style: const TextStyle(
              fontWeight: FontWeight.w700, color: titleTextColor, fontSize: 20),
          maxLines: 1,
        ),
        SizedBox(height: pixleToPercent(5, "height").h),
        Text(
          doctorDetail.specialities.isNotEmpty
              ? doctorDetail.specialities[0]
              : "not specified",
          style: const TextStyle(
              fontWeight: FontWeight.w500, color: primaryColor, fontSize: 16),
          maxLines: 1,
        ),
        SizedBox(height: pixleToPercent(5, "height").h),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.badge_rounded,
              color: Colors.black,
              size: 30,
            ),
            SizedBox(width: pixleToPercent(12, "width").w),
            Text(
              "+ ${doctorDetail.yearsOfExperience} years",
              style: const TextStyle(
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  fontSize: 19),
              maxLines: 1,
            ),
            SizedBox(width: pixleToPercent(10, "width").w),
          ],
        ),
      ],
    );
  }
}
