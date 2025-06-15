import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllCertificateErrors,
  deletecertificate,
  getAllCertificates,
  resetcertificateSlice,
} from "@/store/slices/certificateSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { FolderCheck, CheckCircle, Clock, Cog, Award, Hourglass, FilePen, Eye } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };
  const gotoMangeCertificates = () => {
    navigateTo("/manage/certificates");
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);

  const skillData = skills || [];

  const {
    certificates,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.certificates);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  const [appId, setAppId] = useState(null);
  const handleDeleteCertificate = (id) => {
    setAppId(id);
    dispatch(deletecertificate(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllCertificateErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetcertificateSlice());
      dispatch(getAllCertificates());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-2">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 md:col-span-2 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 pt-5">
              <Card className="w-full flex flex-col  items-center justify-between px-4 py-3">
                <CardHeader className="flex flex-row border-b-0 items-center gap-3 pb-2 text-wrap">
                  <FolderCheck className="w-16 h-16 text-amber-500" strokeWidth={2} />
                  <CardTitle className="text-xl">Projects Completed</CardTitle>
                  <CardTitle className="text-7xl">{projects && projects.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="w-full flex flex-col items-center justify-between px-4 py-3">
                <CardHeader className="flex flex-row border-b-0 items-center gap-3 pb-2 text-wrap">
                  <Cog className="w-16 h-16 text-purple-500" strokeWidth={2} />
                  <CardTitle className="text-xl">Skills</CardTitle>
                  <CardTitle className="text-7xl">{skills && skills.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="w-full flex flex-col items-center justify-between px-4 py-3">
                <CardHeader className="flex flex-row border-b-0 items-center gap-3 pb-2 text-wrap">
                  <Award className="w-16 h-16 text-green-400" strokeWidth={2} />
                  <CardTitle className="text-xl">Licenses & Certifications</CardTitle>
                  <CardTitle className="text-7xl">{certificates && certificates.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="w-full flex flex-col items-center justify-between px-4 py-3">
                <CardHeader className="flex flex-row border-b-0 items-center gap-3 pb-2 text-wrap">
                  <Hourglass className="w-16 h-16 text-red-500" strokeWidth={2} />
                  <CardTitle className="text-xl">Pending Projects</CardTitle>
                  <CardTitle className="text-7xl">{projects ? projects.filter((project) => project.deployed.toLowerCase() === "no").length: 0}</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Tabs>
              <TabsContent className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                  <Card className="h-full min-h-[450px]">
                    <CardHeader className="px-7 flex items-center justify-between flex-row">
                      <CardTitle>Skills Proficiency</CardTitle>
                      <Button onClick={gotoMangeSkills} className="w-fit">
                        Manage Skills
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {skills && skills.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={skillData} layout="vertical" >
                            {/* X-Axis (Proficiency in %) */}
                            <XAxis 
                              type="number" 
                              domain={[0, 100]} 
                              tickMargin={2}
                              label={{ 
                                value: "Proficiency (%)", 
                                position: "insideTop", 
                                dy:18
                              }} 
                            />
                            {/* Y-Axis (Skill Names) - Ensure dataKey is set */}
                            <YAxis 
                              type="category" 
                              dataKey="title" 
                              width={100} 
                              tick={{ fontSize: 15, fill: "#333" }} 
                              label={{ 
                                value: "Skills", 
                                angle: -90, 
                                position: "insideLeft", 
                                dy: 30 
                              }} 
                            />
                            <Tooltip />
                            <Bar dataKey="proficiency" fill="#2563eb" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-xl">No skills added yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
                {/* Timeline */}
                <div className="col-span-2">
                  <Card className="h-full min-h-[450px]">
                    <CardHeader className="px-7 flex items-center justify-between flex-row">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={gotoMangeTimeline} className="w-fit">
                        Manage Education
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-base">Institute</TableHead>
                            <TableHead className="md:table-cell text-base text-right">From</TableHead>
                            <TableHead className="md:table-cell text-base text-right">To</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {timeline && timeline.length > 0 ? (
                            timeline.map((element) => {
                              return (
                                <TableRow className="bg-accent text-base" key={element._id}>
                                  <TableCell className="font-medium">
                                    {element.title}
                                  </TableCell>
                                  <TableCell className="md:table-cell text-right">
                                    {element.timeline.from}
                                  </TableCell>
                                  <TableCell className="md:table-cell text-right">
                                    {element.timeline.to}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell className="text-xl overflow-y-hidden">
                                You have not added any Education.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Liscenses & Certifications</CardTitle>
                    <Button onClick={gotoMangeCertificates} className="w-fit">
                    Manage Certficates
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Status</TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {certificates &&
                        certificates.length > 0 ? (
                          certificates.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium text-base">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell text-center">
                                  {element.issueDate ? (
                                    <CheckCircle className="text-green-600 w-6 h-6" />
                                  ) : (
                                    <Clock className="text-yellow-500 w-6 h-6" />
                                  )}
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleDeleteCertificate(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-xl overflow-y-hidden">
                              You have not added any certificates.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Projects</CardTitle>
                    <Button onClick={gotoMangeProjects} className="w-fit">
                      Manage Projects
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell text-right">Stack</TableHead>
                          <TableHead className="hidden md:table-cell text-right">Deployed</TableHead>
                          <TableHead className="md:table-cell text-right">Update</TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-medium text-base">{element.title}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-right text-base">{element.stack}</TableCell>
                                <TableCell className="hidden md:table-cell text-right">
                                  <Badge className="text-base" variant="secondary">
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell text-right">
                                  <Link to={`/update/project/${element._id}`}>
                                    <button className="text-green-400"><FilePen/></button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link to={element.projectLink} target="_blank">
                                    <button className="text-amber-400"><Eye/></button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
