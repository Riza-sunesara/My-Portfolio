import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  clearAllCertificateErrors,
  deletecertificate,
  getAllCertificates,
  resetcertificateSlice,
} from "@/store/slices/certificateSlice";

const ManageCertificate = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, certificates, error, message } = useSelector(
    (state) => state.certificates
  );
  const dispatch = useDispatch();

  const handleDeleteCertificate = (id) => {
    dispatch(deletecertificate(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllCertificateErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetcertificateSlice());
      dispatch(getAllCertificates());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Certificates</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">Issued Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.length > 0 ? (
                    certificates.map((certificate) => {
                      return (
                        <TableRow className="bg-accent" key={certificate._id}>
                          <TableCell className="font-medium">
                            {certificate.name}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {certificate.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {certificate.issueDate}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
                              onClick={() => handleDeleteCertificate(certificate._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any certificates.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageCertificate;
