import 'package:flutter/material.dart';
import 'package:expandable_text/expandable_text.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/pixle_to_percent.dart';
import '../../domain/entities/doctor_detail.dart';

class BiographySection extends StatelessWidget {
  final DoctorDetail doctorDetail;
  final bool isExpanded;
  final ValueChanged<bool> onExpandedChanged;

  const BiographySection(
      {Key? key,
      required this.doctorDetail,
      required this.isExpanded,
      required this.onExpandedChanged})
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
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(pixleToPercent(15, "width").w),
          topRight: Radius.circular(pixleToPercent(15, "width").w),
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              biography,
              SizedBox(width: pixleToPercent(9, "width").w),
              const Text(
                "Biography",
                style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                    fontSize: 16),
                maxLines: 1,
              ),
            ],
          ),
          SizedBox(height: pixleToPercent(10, "height").h),
          ExpandableText(
            doctorDetail.about,
            maxLines: 8,
            expanded: isExpanded,
            style: TextStyle(fontSize: 14, color: bioTextColor),
            expandText: 'See More',
            collapseText: 'See Less',
            linkColor: Colors.blue,
            onExpandedChanged: onExpandedChanged,
          ),
        ],
      ),
    );
  }
}
