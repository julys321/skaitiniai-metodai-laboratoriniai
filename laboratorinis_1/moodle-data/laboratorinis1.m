%Nevykdykite visu komandu is karto. Geresniam suvokimui, geriau imkite ir 
%nusikopijuokite po viena komanda i komandini langa ir tada ivykdykite

%1 uzduotis
x=[0, 10, -3, 4];
y=[3,2,1,0];
% bo - apskritimai (o) su melynu (b) konturu. 'MarkerFaceColor','b' - uzpildo
%visa skrituli melynai 
plot(x,y,'bo','MarkerFaceColor','b')
%Ziureti daugiau help plot
%Arba
plot(x,y,'bo','MarkerFaceColor','g')
%
%Arba
plot(x,y,'bx','MarkerSize',10)

%2 uzduotis
%Ieškokite Workspace lange Import Data. Importuodami turetumete susiratsi, kad kiekviena eilute butu ikelta, kaip atskiras vektorius su pavadinimais Islaidos ir Pajamos.
%Workspace lange turetu atsirasti 2 nauji 1x 40 vektoriai.  Vektoriu klase "double".

%3 uzduotis 
syms x  %x, kaip bet koks kintamasi
f=0.13*x+41;

ezplot(f,[Pajamos(1),Pajamos(40)]),%braizo funkciju grafikus, kai x bet koks simbolinis kintamasis
 hold on, % sulaiko grafini langa ir toje pat koordinaciu plokstumoje patalpina kita, toliau braizoma grafika
plot(Pajamos,Islaidos,'gs','MarkerFaceColor','g'), 
hold off, 
xlabel(' x '), ylabel('y'), title(' Maziausiu kvadratu metodas')

%4 uzduotis
y=x+3;
y1=2*x+3;
y2=3*x+3;
hold on,
grafikas1=ezplot(y);
grafikas2=ezplot(y1);
grafikas3=ezplot(y2);
hold off,
set(grafikas1,'color','m','LineWidth',2),
set(grafikas2,'color','b','LineWidth',2),
set(grafikas3,'color','y','LineWidth',2),
xlabel(' x '), ylabel('y'), title(' '), legend('k=1','k=2','k=3'),
%axis([-1,1,-584,584])

%5 uzduotis
fprintf('****************************\n')
 fprintf('|Numeris|Pajamos|Islaidos  | \n') 
 fprintf('****************************\n')
for i=1:40
fprintf('|%7G|%7G|%10f|\n',i,Pajamos(i),Islaidos(i));
end
 fprintf('****************************\n')

% 6 uzduotis
X=[0,1,-1,100,20];
Y=[1,0,-1,20,100];
%X==Y
    if X==Y
        disp('Vektoriai lygus')
    else
        disp('Vektoriai nelygus')
    end

 %7 Uzduotis
 for i=1:39
     if Pajamos(i)==Pajamos(i+1)
         disp('Numeriai gretimu pajamu, kurios sutapo')
         i
         i+1
     end
 end

 %8 uzduotis
 d(1)=2,
i=1,
while d(i)> 0.001
d(i+1)=d(i)/2
i=i+1          
end
 %9 uzduotis
 d(1)=2,
i=1,
while d(i)> 0.001
d(i+1)=d(i)/2
i=i+1          
end

%9 uzduotis
syms a b
[aspr,bspr]=solve(20*a-8*b+24,-8*a+4*b-24)
%komanda ivykdoma ir be [aspr,bspr]. Cia [aspr,bspr], leidzia sukurti sprendiniu vektoriu. 

%10 uzduotis
syms x
f=x^3-9*x^2
fisv=diff(f,x)
[xkr]=solve(fisv)
fisv2=diff(f,x,2)
tikrinimui=subs(fisv2,xkr)
%Jei antros eiles isvestine teigiama kritiniame taske, tai tas taskas
%minimumas, jei neigiama-tai maximumas. Vadinasi 0 bus maximumas, o 6 -
%minimumas
ezplot(f,[-1,7])
%Maple turi maximize ir minimize komandas 

%10 uzduotis
clear all
syms x
a=input('Iveskite intervalo pradzia a')%komandiniame lange leis vartotojui paciam ivesti intervalo pradzia
b=input('Iveskite intervalo pabaiga b')
f=exp(sin(x))
I=int(f,a,b)
%Neapskaiciuoja, tai apytiksliai.
Apytiksliai=quad('exp(sin(x))',a,b,0.000001)
format long
Apytiksliai
