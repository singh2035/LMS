import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { ChapterTitleForm } from "./_comps/chapter-title-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });
  if (!chapter) {
    return redirect("/");
  }
  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back To Course Setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2 ">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>{" "}
                <span className="text-sm text-slate-700">
                  Complete All Field {completionText}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grd-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your Chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
