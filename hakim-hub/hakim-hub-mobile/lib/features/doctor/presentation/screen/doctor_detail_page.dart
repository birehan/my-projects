import 'package:expandable_text/expandable_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';
import 'package:hakim_hub_mobile/router/routes.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

import '../../../../core/utils/pixle_to_percent.dart';
import '../../../../core/utils/ui_converter.dart';
import '../widgets/doctor_avater_section.dart';
import '../widgets/doctor_info_section.dart';
import '../widgets/biography_section.dart';
import '../widgets/education_section.dart';
import '../widgets/doctor_detail_shimmer.dart';

class DoctorDetailPage extends StatefulWidget {
  final String doctorDetailId;

  const DoctorDetailPage({Key? key, required this.doctorDetailId})
      : super(key: key);

  @override
  State<DoctorDetailPage> createState() => _DoctorDetailPageState();
}

class _DoctorDetailPageState extends State<DoctorDetailPage> {
  late DoctorDetailBloc _doctorDetailBloc;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _doctorDetailBloc = BlocProvider.of<DoctorDetailBloc>(context);
    _doctorDetailBloc
        .add(GetDoctorDetailEvent(doctorDetailId: widget.doctorDetailId));
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DoctorDetailBloc, DoctorDetailState>(
      builder: (context, state) {
        if (state is DoctorDetailLoadingState) {
          return Scaffold(
            body: DoctorDetailShimmer(),
          );
        } else if (state is DoctorDetailSuccessState) {
          final doctorDetail = state.doctorDetail;
          return Scaffold(
            body: SafeArea(
              child: Container(
                padding: EdgeInsets.only(top: pixleToPercent(30, "height").h),
                height: double.infinity,
                color: Colors.white,
                child: SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      DoctorAvatarSection(
                          doctorDetail: doctorDetail, context_: context),
                      SizedBox(height: pixleToPercent(40, "height").h),
                      DoctorInfoSection(doctorDetail: doctorDetail),
                      SizedBox(height: pixleToPercent(30, "height").h),
                      BiographySection(
                          doctorDetail: doctorDetail,
                          isExpanded: _isExpanded,
                          onExpandedChanged: _handleExpandedChanged),
                      SizedBox(height: pixleToPercent(30, "height").h),
                      EducationSection(doctorDetail: doctorDetail),
                    ],
                  ),
                ),
              ),
            ),
          );
        }
        return const Center(child: Text("Couldn't load doctor"));
      },
    );
  }

  void _handleExpandedChanged(bool value) {
    setState(() {
      _isExpanded = value;
    });
  }
}
