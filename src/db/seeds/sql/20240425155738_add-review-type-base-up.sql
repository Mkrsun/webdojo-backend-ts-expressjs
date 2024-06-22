SET IDENTITY_INSERT [dbo].[ReviewType] ON;
insert into [dbo].[ReviewType] ([Id], [Name]) values 
    (1, 'post-inmediate-call'),
    (2, 'post-scheduled-call'),
    (3, 'post-abandoned-scheduled-call')
