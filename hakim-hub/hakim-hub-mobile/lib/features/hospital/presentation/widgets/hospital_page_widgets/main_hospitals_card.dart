import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_search_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_state.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/widgets/chips_container.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:shimmer/shimmer.dart';



class MainHospitalsCard extends StatefulWidget {
  final InstitutionSearchDomain institutionSearchDomain;
  MainHospitalsCard({required this.institutionSearchDomain, super.key});

  @override
  State<MainHospitalsCard> createState() => _MainHospitalsCardState();
}

class _MainHospitalsCardState extends State<MainHospitalsCard> {
  late ImageLoadBloc _bloc;

  bool isOpened = true;

  @override
  void initState() {
    super.initState();
    _bloc = ImageLoadBloc();
    ImageStream stream = NetworkImage(widget.institutionSearchDomain.bannerUrl)
        .resolve(ImageConfiguration.empty);
    stream.addListener(ImageStreamListener((info, synchronousCall) {
      _bloc.add(ImageLoaded());
    }));
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Container(
        margin: const EdgeInsets.only(bottom: 10, top: 10, left: 0, right: 0),
        width: pixleToPercent(370, 'width').w,
        height: pixleToPercent(305, 'height').h,
        decoration: const BoxDecoration(
            color: secondryTextColor,
            borderRadius: BorderRadius.all(Radius.circular(20)),
            boxShadow: [
              BoxShadow(
                  color: hospitalBorderShadowColor,
                  blurRadius: 3,
                  offset: Offset(0, 3),
                  spreadRadius: 0.5)
            ]),
        child: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Container(
            width: pixleToPercent(370, 'width').w,
            height: pixleToPercent(146, 'height').h,
            child: BlocProvider(
              create: (context) => _bloc,
              child: BlocBuilder<ImageLoadBloc, ImageLoadState>(
                builder: (context, state) {
                  if (state is ImageNotLoadedState ||
                      state is ImageLoadingState) {
                    return Shimmer.fromColors(
                      baseColor: Colors.grey.shade300,
                      highlightColor: Colors.grey.shade100,
                      child: Container(
                        width: pixleToPercent(370, 'width').w,
                        height: pixleToPercent(146, 'height').h,
                        decoration: const BoxDecoration(
                          color: shimmerColor,
                          borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(20),
                              topRight: Radius.circular(20)),
                        ),
                      ),
                    );
                  } else {
                    return Container(
                      width: pixleToPercent(370, 'width').w,
                      height: pixleToPercent(146, 'height').h,
                      decoration: BoxDecoration(
                        borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(20),
                            topRight: Radius.circular(20)),
                        image: DecorationImage(
                          image: NetworkImage(
                            widget.institutionSearchDomain.bannerUrl,
                          ),
                          fit: BoxFit.cover,
                          onError: (_, __) {
                            // Handle error by providing a fallback image
                            const AssetImage('assets/images/hospital_img.png');
                          },
                        ),
                      ),
                    );
                  }
                },
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          Padding(
            padding: EdgeInsets.only(left: pixleToPercent(20, 'width').w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: UIConverter.getComponentWidth(context, 176),
                  child: Text(widget.institutionSearchDomain.institutionName,
                      style: TextStyle(
                          color: titleTextColor,
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w600),
                      maxLines: 1),
                ),
                Row(
                  children: [
                    alarm,
                    SizedBox(width: UIConverter.getComponentWidth(context, 5)),
                    Text(
                        "${widget.institutionSearchDomain.institutionAvailability.opening.substring(0, 2)}am-${widget.institutionSearchDomain.institutionAvailability.closing.substring(0, 2)}pm",
                        style: const TextStyle(
                            color: titleTextColor,
                            fontSize: 11,
                            fontWeight: FontWeight.w400),
                        maxLines: 1),
                  ],
                ),
                SizedBox(
                  height: 15.sp,
                ),
                SizedBox(
                  width: pixleToPercent(300, 'width').w,
                  height: pixleToPercent(32, 'height').h,
                  child: ListView.builder(
                    physics: const AlwaysScrollableScrollPhysics(),
                    scrollDirection: Axis.horizontal,
                    itemCount: widget.institutionSearchDomain.services.length,
                    itemBuilder: ((context, index) {
                      print(widget.institutionSearchDomain.services[index]);
                      return chipsContainer(
                          widget.institutionSearchDomain.services[index]);
                    }),
                  ),
                ),
                SizedBox(
                  height: pixleToPercent(17, 'height').h,
                ),
              ],
            ),
          ),
          Padding(
            padding: EdgeInsets.only(right: pixleToPercent(20, 'width').w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                location,
                SizedBox(
                  width: UIConverter.getComponentWidth(context, 5),
                ),
                SizedBox(
                  width: pixleToPercent(300, 'width').w,
                  child: Text(
                    widget.institutionSearchDomain.address.summary,
                    style: const TextStyle(
                      fontWeight: FontWeight.w400,
                      fontSize: 12,
                    ),
                    textAlign: TextAlign.end,
                    maxLines: 1,
                  ),
                )
              ],
            ),
          )
        ]),
      ),
      Positioned(
        child: Container(
          width: UIConverter.getComponentWidth(context, 74),
          height: UIConverter.getComponentHeight(context, 29),
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20), bottomRight: Radius.circular(20)),
            color: backgroundColor,
          ),
          margin: EdgeInsets.only(
            bottom: UIConverter.getComponentHeight(context, 10),
            top: UIConverter.getComponentHeight(context, 10),
          ),
          child: Center(
            child: Text(
              widget.institutionSearchDomain.status,
              style: TextStyle(
                  color: widget.institutionSearchDomain.status.toLowerCase() ==
                          "open"
                      ? greenColor
                      : redColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 12),
            ),
          ),
        ),
      )
    ]);
  }
}
