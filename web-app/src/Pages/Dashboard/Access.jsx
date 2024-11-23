import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../Contexts/CurrentUser";
import { Button, Card, Col, Divider, Flex, Popconfirm, Row, Typography, message } from "antd";
import RoleAccess from "../../Components/RoleAccess";
import { useAPI } from "../../Contexts/API";

export default function Accueil() {
  const currentUser = useCurrentUser();
  const api = useAPI();
  const [PendingUsers, setPendingUsers] = useState(null);
  const [openPopconfirmAccept, setOpenPopconfirmAccept] = useState(null); // Manage open state for 'Accepter' Popconfirm
  const [openPopconfirmReject, setOpenPopconfirmReject] = useState(null); // Manage open state for 'Rejeter' Popconfirm

  useEffect(() => {
    api.get("/api/admin/pending-users").then((response) => {
      setPendingUsers(response.data);
    });
  }, []);

  const numberOfUsers = PendingUsers ? PendingUsers.length : 0;

  const Accept = (userId) => {
    api
      .post(`/api/admin/pending-users/${userId}/accept`)
      .then(() => {
        console.log(`Utilisateur ${userId} accepté`);
        setPendingUsers(PendingUsers.filter((user) => user.id !== userId));
        message.success("User accepted.");
      })
      .catch((error) => {
        console.error("Error accepting user:", error);
        message.error("Erreur lors de l'acceptation de l'utilisateur, veuillez réessayer plus tard.");
      });
  };

  const Refuser = (userId) => {
    api
      .delete(`/api/admin/pending-users/${userId}/reject`)
      .then(() => {
        //console.log(`Utilisateur ${userId} refusé`);
        //setPendingUsers(PendingUsers.filter((user) => user.id !== userId));
        message.success("Utilisateur refusé.");
      })
      .catch((error) => {
        console.error("Error rejecting user", error);
        message.error("Erreur lors du refus de l'utilisateur, veuillez réessayer plus tard.");
        console.log(`/api/admin/pending-users/${userId}/reject`);
      });
  };

  const handlePopconfirmChangeAccept = (userId, open) => {
    setOpenPopconfirmAccept(open ? userId : null);
  };

  const handlePopconfirmChangeReject = (userId, open) => {
    setOpenPopconfirmReject(open ? userId : null);
  };
  var text = null;
  if (numberOfUsers == 0) {
    text = "il n'y a aucun utilisateur à accepter pour le moment";
  } else {
    text = `il y a ${numberOfUsers} utilisateurs à accepter`;
  }
  return (
    <>
      <RoleAccess anyOf={["Admin"]}>
        <Typography.Title level={3}>
          Bonjour {currentUser.displayName.split(" ")[0]}, {text}.
        </Typography.Title>
        <Divider />
        <Row gutter={[16, 16]}>
          {PendingUsers &&
            PendingUsers.map((user) => (
              <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                <Card
                  title={user.displayName}
                  actions={[
                    <Flex wrap justify="center" gap="small" key={user.id}>
                      <Popconfirm
                        title="Êtes-vous sûr de vouloir accepter cet utilisateur ?"
                        open={openPopconfirmAccept === user.id} 
                        onOpenChange={(open) => handlePopconfirmChangeAccept(user.id, open)}
                        onConfirm={() => Accept(user.id)}
                        onCancel={() => handlePopconfirmChangeAccept(user.id, false)} 
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" style={{ backgroundColor: "#52c41a" }}>
                          Accepter
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="Êtes-vous sûr de vouloir refuser cet utilisateur ?"
                        open={openPopconfirmReject === user.id} 
                        onOpenChange={(open) => handlePopconfirmChangeReject(user.id, open)}
                        onConfirm={() => Refuser(user.id)}
                        onCancel={() => handlePopconfirmChangeReject(user.id, false)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" danger>
                          Rejeter
                        </Button>
                      </Popconfirm>
                    </Flex>,
                  ]}
                >
                  <p>
                    <b>Mail :</b> {user.email}
                  </p>
                  <p>
                    <b>Numéro de téléphone :</b> {user.phoneNumber}
                  </p>
                  <p>
                    <b>Rôle(s) demandés :</b> {user.roles}
                  </p>
                  <p>
                    <b>Unités demandées :</b> {user.units}
                  </p>
                </Card>
              </Col>
            ))}
        </Row>
      </RoleAccess>
    </>
  );
}