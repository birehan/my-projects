import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/router/routes.dart';
import '../../../../core/utils/colors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import '../../../../core/utils/icons.dart';
import '../../../../core/utils/pixle_to_percent.dart';
import '../../../hospital/presentation/bloc/bloc/search_hospital_bloc.dart';
import '../widgets/home_shimmer_page.dart';
import '../widgets/hospital_card.dart';
import '../widgets/how_are_you_feeling.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});
  TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: pixleToPercent(40, "width").w,
                  vertical: pixleToPercent(40, "height").h),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      'assets/images/homepage.svg',
                    ),

                    SizedBox(
                      height: Adaptive.h(pixleToPercent(10, "height")),
                    ),
                    Text(
                      textAlign: TextAlign.center,
                      'Provide easily accessible information about healthcare facilities and healthcare professionals',
                      style: TextStyle(
                          fontSize: 16.sp,
                          color: primaryTextColor,
                          fontWeight: FontWeight.w400),
                    ),
                    SizedBox(
                      height: pixleToPercent(30, "height").h,
                    ),
                    // TextField(
                    //   controller: _controller,
                    //   textInputAction: TextInputAction.search,
                    //   onSubmitted: (value) {
                    //     context.pushNamed(AppRoutes.ChatPage, queryParameters: {
                    //       "chatBotIntialMessage": _controller.text ?? ""
                    //     });
                    //   },
                    //   decoration: InputDecoration(
                    //     suffixIcon: GestureDetector(
                    //       child: send,
                    //       onTap: () {
                    //         context.pushNamed(AppRoutes.ChatPage,
                    //             queryParameters: {
                    //               "chatBotIntialMessage": _controller.text ?? ""
                    //             });
                    //       },
                    //     ),
                    //     hintText: 'Write a message ...',
                    //     border: InputBorder.none,
                    //   ),
                    // ),
                    GestureDetector(
                      child: const HowAreYouFeeling(),
                      onTap: () {
                        print("object");
                        context.pushNamed(AppRoutes.Home,
                            queryParameters: {"index": "1"});
                      },
                    ),
                    SizedBox(
                      height: Adaptive.h(pixleToPercent(10, "height")),
                    ),
                  ]),
            ),
            BlocConsumer<SearchHospitalBloc, SearchHospitalState>(
              listener: (context, state) {},
              builder: (context, state) {
                if (state is SearchHospitalLoading ||
                    state is SearchHospitalInitial) {
                  print("inside loading ");
                  return Padding(
                    padding:
                        EdgeInsets.only(left: pixleToPercent(10, "width").w),
                    child: SizedBox(
                        height: pixleToPercent(400, "height").h,
                        width: double.infinity,
                        child: HomeDoctorLoadShimmerEffect()),
                  );
                } else if (state is SearchHospitalSuccess) {
                  return Padding(
                    padding:
                        EdgeInsets.only(left: pixleToPercent(10, "width").w),
                    child: SizedBox(
                      height: pixleToPercent(400, "height").h,
                      width: double.infinity,
                      child: ListView.separated(
                        physics: BouncingScrollPhysics(),
                        scrollDirection: Axis.horizontal,
                        itemCount: state.institutionSearchDomain.length,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            child: HospitalsCard(
                              address: state.institutionSearchDomain[index]
                                  .address.summary,
                              name: state.institutionSearchDomain[index]
                                  .institutionName,
                              chipList:
                                  state.institutionSearchDomain[index].services,
                              imageUrl:
                                  state.institutionSearchDomain[index].logoUrl,
                              isOpened:
                                  state.institutionSearchDomain[index].status,
                            ),
                            onTap: () {
                              context.pushNamed(AppRoutes.HospitalDetailPage,
                                  queryParameters: {
                                    "id":
                                        state.institutionSearchDomain[index].id,
                                    "prevIndex": "0"
                                  });
                            },
                          );
                        },
                        separatorBuilder: (BuildContext context, int index) {
                          return SizedBox(
                            width: pixleToPercent(25, "width").w,
                          );
                        },
                      ),
                    ),
                  );
                } else {
                  return const Center(
                    child: Text("Error while loading hospitals"),
                  );
                }
              },
            )
          ],
        ),
      )),
    );
  }
}
