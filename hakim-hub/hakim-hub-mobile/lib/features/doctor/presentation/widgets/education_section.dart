import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/pixle_to_percent.dart';
import '../../domain/entities/doctor_detail.dart';

class EducationSection extends StatelessWidget {
  final DoctorDetail doctorDetail;

  const EducationSection({Key? key, required this.doctorDetail})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        left: pixleToPercent(38, "width").w,
        right: pixleToPercent(38, "width").w,
        bottom: pixleToPercent(15, "height").h,
        top: pixleToPercent(20, "height").h,
      ),
      child: Column(
        children: [
          Row(
            children: [
              educationIcon,
              SizedBox(width: pixleToPercent(10, "width").w),
              const Text(
                "Education",
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                    fontSize: 16),
              ),
            ],
          ),
          SizedBox(height: pixleToPercent(10, "height").h),
          if (doctorDetail.educations.isNotEmpty)
            SizedBox(
              width: double.infinity,
              height: pixleToPercent(100, "height").h,
              child: ListView.builder(
                itemCount: doctorDetail.educations.length,
                itemBuilder: (context, index) {
                  final education = doctorDetail.educations[index];
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            education.degree,
                            style: const TextStyle(
                                fontWeight: FontWeight.w600,
                                color: degreeTextColor,
                                fontSize: 14),
                          ),
                          SizedBox(width: pixleToPercent(7, "width").w),
                          Expanded(
                            child: Text(
                              "${education.startDate} - ${education.endDate}",
                              style: const TextStyle(
                                  fontWeight: FontWeight.w300,
                                  color: primaryTextColor,
                                  fontSize: 12),
                                  overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: pixleToPercent(5, "height").h),
                      Text(
                        education.institution,
                        style: const TextStyle(
                            fontWeight: FontWeight.w300,
                            color: primaryTextColor,
                            fontSize: 13),
                      ),
                      SizedBox(height: pixleToPercent(10, "height").h),
                    ],
                  );
                },
              ),
            ),
        ],
      ),
    );
  }
}
