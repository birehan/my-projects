import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/image_bloc/image_state.dart';
import 'package:shimmer/shimmer.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class DoctorCard extends StatefulWidget {
  final String imageUrl;
  final String title;
  final String subtitle;

  DoctorCard(
      {required this.imageUrl, required this.title, required this.subtitle});

  @override
  _DoctorCardState createState() => _DoctorCardState();
}

class _DoctorCardState extends State<DoctorCard> {
  late ImageLoadBloc _bloc;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        top: pixleToPercent(5, "height").h,
      ),
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.center,
        children: [
          buildCard(context, widget.title, widget.subtitle),
          Positioned(
            top: -pixleToPercent(5, "height").h,
            child: BlocProvider(
              create: (context) => _bloc,
              child: BlocBuilder<ImageLoadBloc, ImageLoadState>(
                builder: (context, state) {
                  if (state is ImageNotLoadedState ||
                      state is ImageLoadingState) {
                    return Shimmer.fromColors(
                      baseColor: Colors.grey.shade300,
                      highlightColor: Colors.grey.shade100,
                      child: CircleAvatar(
                        backgroundColor: shimmerColor,
                        radius: pixleToPercent(83, "height").w,
                      ),
                    );
                  } else {
                    return CircleAvatar(
                      backgroundColor: shimmerColor,
                      radius: pixleToPercent(83, "height").w,
                      backgroundImage: NetworkImage(widget.imageUrl),
                      onBackgroundImageError: (exception, stackTrace) {
                        AssetImage(widget.imageUrl);
                      },
                    );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _bloc = ImageLoadBloc();
    ImageStream stream =
        NetworkImage(widget.imageUrl).resolve(ImageConfiguration.empty);
    stream.addListener(ImageStreamListener((info, synchronousCall) {
      _bloc.add(ImageLoaded());
    }));
  }
}

Widget buildCard(
    BuildContext context, String doctorName, String doctorSpecialization) {
  return Card(
    color: Colors.white,
    shadowColor: Colors.black,
    elevation: pixleToPercent(8, "height").h,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(pixleToPercent(20, "height").h),
    ),
    child: SizedBox(
      height: pixleToPercent(179, "height").h,
      width: pixleToPercent(190.22, "width").w,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(
            height: pixleToPercent(78, "height").h,
          ),
          Text(
            doctorName,
            maxLines: 1,
            style: TextStyle(
              color: primaryTextColor,
              fontFamily: 'Poppins',
              fontSize: pixleToPercent(17, "height").h,
            ),
          ),
          Text(
            doctorSpecialization,
            style: TextStyle(
              color: primaryColor,
              fontWeight: FontWeight.bold,
              fontFamily: 'Poppins',
              fontSize: pixleToPercent(15, "height").h,
            ),
          ),
        ],
      ),
    ),
  );
}
